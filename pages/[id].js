import uniqueId from 'lodash/uniqueId';
import styles from '../styles/Panels.module.css';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:5000/items');
  const data = await res.json();

  const paths = data.map(panel => {
    return {
      params: { id: panel.id.toString() }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:5000/items/${id}`);
  const data = await res.json();

  return {
    props: { panel: data }
  }
}

const Details = ({ panel }) => {
  return (
    <div className={styles.singlePanel}>
      <h1>{ panel.title }</h1>
        <div>
          <p>{ panel.category }</p>
          <p>{ panel.intro }</p>
          <div>{panel.details && panel.details.map(res => {
            return <div key={uniqueId('panel_')}>{res}</div>;
          })}</div>
      </div>
    </div>
  );
}

export default Details;