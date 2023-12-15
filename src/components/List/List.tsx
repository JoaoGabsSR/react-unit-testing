import { useState } from "react";

type TListItems = {
    initialItems: string[];
}

function List({ initialItems }: TListItems) {
    const [list, setList] = useState(initialItems);
    const [newItem, setNewItem] = useState('');

    const addToList = () => {
        setTimeout(() => {
            setList(state => [...state, newItem])
        }, 500);
    }

    const removeFromList = (actualItem: string) => {
        setTimeout(() => {
            setList(state => state.filter(item => item !== actualItem));
        }, 500);
    }

    return (
        <>
            <input placeholder='Novo item...' value={newItem} onChange={e => setNewItem(e.target.value)} />
            <button onClick={addToList}>Adicionar</button>
            <ul>
                {list.map(itemInLinst => {
                    return (
                        <li key={itemInLinst}>
                            {itemInLinst}
                            <button onClick={() => removeFromList(itemInLinst)}>Remover</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default List;
