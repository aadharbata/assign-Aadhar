import { BellIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  user: any | null;
}

const TopNav = ({ sidebarOpen, setSidebarOpen, user }: TopNavProps) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="hidden md:inline-block text-lg font-semibold text-gray-800">
                {user?.company || 'TalentHub'}
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <BellIcon size={20} />
              <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {user && (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Aadhar Batra</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer"
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;