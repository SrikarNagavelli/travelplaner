import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, Utensils, Bus, MapPin, DollarSign, BarChart2, Calendar, Plus, Trash2, Save } from 'lucide-react';

interface ExpenseItem {
  id: string;
  category: string;
  description: string;
  amount: number;
}

interface BudgetCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  expenses: ExpenseItem[];
}

const BudgetCalculatorPage: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(7);
  const [currency, setCurrency] = useState('USD');
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: 'transportation',
      name: 'Transportation',
      icon: <Plane size={20} />,
      color: 'bg-blue-500',
      expenses: [
        { id: 'flight', category: 'transportation', description: 'Flight tickets', amount: 800 }
      ]
    },
    {
      id: 'accommodation',
      name: 'Accommodation',
      icon: <Hotel size={20} />,
      color: 'bg-green-500',
      expenses: [
        { id: 'hotel', category: 'accommodation', description: 'Hotel (7 nights)', amount: 700 }
      ]
    },
    {
      id: 'food',
      name: 'Food & Drinks',
      icon: <Utensils size={20} />,
      color: 'bg-yellow-500',
      expenses: [
        { id: 'meals', category: 'food', description: 'Meals', amount: 350 }
      ]
    },
    {
      id: 'activities',
      name: 'Activities',
      icon: <MapPin size={20} />,
      color: 'bg-purple-500',
      expenses: [
        { id: 'tours', category: 'activities', description: 'Tours and attractions', amount: 200 }
      ]
    },
    {
      id: 'localTransport',
      name: 'Local Transport',
      icon: <Bus size={20} />,
      color: 'bg-red-500',
      expenses: [
        { id: 'taxi', category: 'localTransport', description: 'Taxis and public transport', amount: 100 }
      ]
    }
  ]);

  const [newExpense, setNewExpense] = useState<{
    categoryId: string;
    description: string;
    amount: number;
  }>({
    categoryId: '',
    description: '',
    amount: 0
  });

  const [showAddExpense, setShowAddExpense] = useState(false);

  const getTotalExpenses = () => {
    return categories.reduce((total, category) => {
      return total + category.expenses.reduce((catTotal, expense) => catTotal + expense.amount, 0);
    }, 0);
  };

  const getCategoryTotal = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return 0;
    return category.expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getTotalPerPerson = () => {
    return travelers > 0 ? getTotalExpenses() / travelers : 0;
  };

  const getTotalPerDay = () => {
    return days > 0 ? getTotalExpenses() / days : 0;
  };

  const handleAddExpense = () => {
    if (!newExpense.categoryId || !newExpense.description || newExpense.amount <= 0) {
      return;
    }

    const updatedCategories = [...categories];
    const categoryIndex = updatedCategories.findIndex(cat => cat.id === newExpense.categoryId);
    
    if (categoryIndex >= 0) {
      updatedCategories[categoryIndex].expenses.push({
        id: `expense-${Date.now()}`,
        category: newExpense.categoryId,
        description: newExpense.description,
        amount: newExpense.amount
      });
      
      setCategories(updatedCategories);
      setNewExpense({
        categoryId: '',
        description: '',
        amount: 0
      });
      setShowAddExpense(false);
    }
  };

  const handleRemoveExpense = (categoryId: string, expenseId: string) => {
    const updatedCategories = [...categories];
    const categoryIndex = updatedCategories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex >= 0) {
      updatedCategories[categoryIndex].expenses = updatedCategories[categoryIndex].expenses.filter(
        expense => expense.id !== expenseId
      );
      
      setCategories(updatedCategories);
    }
  };

  const getCategoryPercentage = (categoryId: string) => {
    const total = getTotalExpenses();
    if (total === 0) return 0;
    return (getCategoryTotal(categoryId) / total) * 100;
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Budget Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Plan your trip expenses and keep track of your travel budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-xl mb-6">Trip Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    id="destination"
                    placeholder="Where are you going?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                      Travelers
                    </label>
                    <input
                      type="number"
                      id="travelers"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
                      Days
                    </label>
                    <input
                      type="number"
                      id="days"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                      value={days}
                      onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    id="currency"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-xl mb-6">Budget Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Total Budget:</span>
                  <span className="font-bold text-xl text-gray-900">${getTotalExpenses().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Per Person:</span>
                  <span className="font-semibold text-gray-900">${getTotalPerPerson().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Per Day:</span>
                  <span className="font-semibold text-gray-900">${getTotalPerDay().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Per Person Per Day:</span>
                  <span className="font-semibold text-gray-900">
                    ${(getTotalPerPerson() / days).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-4">Budget Breakdown</h3>
                
                <div className="space-y-3">
                  {categories.map((category) => {
                    const percentage = getCategoryPercentage(category.id);
                    return (
                      <div key={category.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`${category.color} text-white w-6 h-6 rounded-full flex items-center justify-center mr-2`}>
                              {category.icon}
                            </div>
                            <span className="text-sm text-gray-700">{category.name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            ${getCategoryTotal(category.id).toFixed(2)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full ${category.color.replace('bg-', 'bg-')}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Expenses List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-xl">Expenses</h2>
                <button
                  onClick={() => setShowAddExpense(true)}
                  className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Expense</span>
                </button>
              </div>
              
              {showAddExpense && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-lg mb-4">Add New Expense</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                        value={newExpense.categoryId}
                        onChange={(e) => setNewExpense({ ...newExpense, categoryId: e.target.value })}
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                          value={newExpense.amount || ''}
                          onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowAddExpense(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddExpense}
                      className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              )}
              
              {categories.map((category) => (
                <div key={category.id} className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className={`${category.color} text-white w-8 h-8 rounded-full flex items-center justify-center mr-3`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </div>
                  
                  {category.expenses.length > 0 ? (
                    <div className="space-y-3">
                      {category.expenses.map((expense) => (
                        <div 
                          key={expense.id} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{expense.description}</span>
                          <div className="flex items-center space-x-4">
                            <span className="font-medium">${expense.amount.toFixed(2)}</span>
                            <button
                              onClick={() => handleRemoveExpense(category.id, expense.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No expenses added yet.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculatorPage;