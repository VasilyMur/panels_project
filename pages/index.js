import { useState, useEffect, useCallback } from 'react';
import PanelComponent from './panel';

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/items');
  const data = await res.json();

  return {
    props: { panels: data }
  }
}

const Index = ({ panels }) => {
  const [panelsData, setPanelsData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    setPanelsData(panels);
  }, []);

  const handleAdd = useCallback((panel) => {
    setSelected((current) => {
      return [...current, panel];
    })
  }, []);

  const handleRemove = useCallback((panel) => {
    setSelected((current) => {
      const currentHasItem = current.some(res => res.id === panel.id);
 
      if (currentHasItem) {
        const itemIndex = current.findIndex(res => res.id === panel.id);
        return [...current.slice(0, itemIndex), ...current.slice(itemIndex + 1)];
      }
      return current;
    })
  }, []);

  
 const handleNext = () => {
  setCurrentPage((current) => {
    return current + 1;
  })
 }
 const handlePrevious = () => {
  setCurrentPage((current) => {
    return current - 1;
  })
 }

 const numPages = Math.ceil(panelsData.length / itemsPerPage);
 const isFirst = currentPage === 1;
 const isLast = currentPage === numPages;

  return (
    <div>
      <h1>Panels List</h1>
      <div>#Selected items: {selected.length}</div>

      {panelsData.length && panelsData
      .slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      )
      .map(panel => (
        <PanelComponent 
          key={panel.id} 
          panel={panel} 
          addToCart={handleAdd}
          removeFromCart={handleRemove}
          />
      ))}

      <div className='buttonsPagination'>
        <button 
          onClick={handlePrevious} 
          aria-disabled={isFirst} 
          >
            Previous
        </button>
        <button 
          onClick={handleNext} 
          aria-disabled={isLast}
          >
            Next
        </button>
      </div>


    </div>
  );
}
 
export default Index;