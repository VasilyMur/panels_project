import { memo } from 'react';
import Link from 'next/link';
import styles from '../styles/Panels.module.css';

const PanelComponent = ({ panel, addToCart, removeFromCart }) => {
  const handleAdd = () => {
    addToCart(panel)
  }
  const handleRemove = () => {
    removeFromCart(panel)
  }
  return (

    <div className={styles.panelCard}>
      <Link href={`/${panel.id}`} key={panel.id}>
        <a>
          <h3>{panel.title}</h3>
        </a>
      </Link>
      <p>{panel.category}</p>
      <p>{panel.intro}</p>
      <button 
        onClick={handleAdd}
        >
        Add
      </button>
      <button 
        onClick={handleRemove}
        >
        Remove
      </button>
    </div>
  )
}

export default memo(PanelComponent);