const addItems = document.querySelector('.addItems');
const itemList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    //this prevent from reloading and get everything done in client side only.
    console.log('Soon an item will be added');
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    }
    console.log(item);
    items.push(item);
    populateList(items,itemList);
    localStorage.setItem('items',JSON.stringify(items));
    this.reset();
    // this is form here 
}
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
          <input type="checkbox" data-index=${i} id='item-${i}' ${plate.done ? 'checked':''}/>
          <label for="item-${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

function toggleDone(e){
    if (!e.target.matches('input')) return; //skip this unless it is an input 
    const element = e.target;
    console.log(element.dataset.index);
    const indeX = element.dataset.index;
    items[indeX].done = !items[indeX].done;
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items,itemList);
}

addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', toggleDone);  //for event delegation
populateList(items,itemList);