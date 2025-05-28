import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  className = '',
  hoverEffect = false,
}) => {
  const cardVariants = {
    hover: { 
      y: -5,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    initial: { 
      y: 0,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-lg border border-neutral-200 overflow-hidden ${className}`}
      initial="initial"
      whileHover={hoverEffect ? "hover" : "initial"}
      variants={cardVariants}
      transition={{ duration: 0.2 }}
    >
      {title && (
        <div className="border-b border-neutral-200 px-6 py-4">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-neutral-200 px-6 py-4 bg-neutral-50">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;