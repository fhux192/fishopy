// src/hooks/useColumns.js
import { useState, useEffect } from 'react';

const useColumns = () => {
  const getColumns = (width) => {
    if (width >= 1920) return 5;
    if (width >= 1440) return 5;
    if (width >= 1174) return 4;
    if (width >= 768) return 4;
    if (width >= 580) return 4;
    if (width >= 320) return 4;
    return 2; 
  };

  const [columns, setColumns] = useState(() => getColumns(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columns;
};

export default useColumns;
