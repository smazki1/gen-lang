
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-surface shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 space-x-reverse">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12.001 2C6.47816 2 2.00195 6.47619 2.00195 12C2.00195 17.5238 6.47816 22 12.001 22C17.5238 22 22.002 17.5238 22.002 12C22.002 6.47619 17.5238 2 12.001 2ZM12.001 4C14.1226 4 15.9392 5.16434 16.9407 6.81543L9.18652 14.5696C7.53543 13.5681 6.37109 11.7514 6.37109 9.62988C6.37109 6.52002 8.89111 4 12.001 4ZM7.05933 17.1846C8.06079 18.8357 9.87744 20 12.001 20C15.1108 20 17.6309 17.4799 17.6309 14.3701C17.6309 12.2485 16.4666 10.4319 14.8154 9.43042L14.8145 9.42944L7.05933 17.1846Z" />
             </svg>
            <h1 className="text-xl md:text-2xl font-bold text-text-primary">
              מחולל דפי נחיתה AI
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
