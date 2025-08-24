// Navigation
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach(btn => {
  btn.onclick = () => {
    pages.forEach(p => p.classList.remove('visible'));
    navBtns.forEach(b => b.classList.remove('active'));
    document.getElementById(btn.dataset.page).classList.add('visible');
    btn.classList.add('active');
  }
});

// Contact Form Demo
document.getElementById('contactForm').onsubmit = (e) => {
  e.preventDefault();
  document.getElementById('contactStatus').textContent = "Message sent! (Demo only)";
  e.target.reset();
};

// To-Do List with localStorage
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
function getTodos() {
  return JSON.parse(localStorage.getItem('mytodos') || '[]');
}
function saveTodos(todos) {
  localStorage.setItem('mytodos', JSON.stringify(todos));
}
function renderTodos() {
  const todos = getTodos();
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.style.textDecoration = todo.completed ? 'line-through':'none';
    li.onclick = () => {
      todos[idx].completed = !todos[idx].completed;
      saveTodos(todos); renderTodos();
    }
    const del = document.createElement('button');
    del.textContent = "Delete";
    del.onclick = (e) => {
      e.stopPropagation();
      todos.splice(idx,1); saveTodos(todos); renderTodos();
    }
    li.appendChild(del);
    todoList.appendChild(li);
  });
}
addTodoBtn.onclick = () => {
  const text = todoInput.value.trim();
  if(text) {
    const todos = getTodos();
    todos.push({text, completed:false});
    saveTodos(todos); todoInput.value=''; renderTodos();
  }
}
renderTodos();

// Product List Feature
const products = [
  {name:"JS Book", category:"books", price:20, rating:4.8},
  {name:"Wireless Mouse", category:"gadgets", price:15, rating:4.5},
  {name:"CSS Book", category:"books", price:18, rating:4.2},
  {name:"Smart Watch", category:"gadgets", price:50, rating:4.4}
];
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `<b>${p.name}</b>
    <br>Category: ${p.category}
    <br>Price: $${p.price}
    <br>Rating: ${p.rating}`;
    grid.appendChild(card);
  });
}
document.getElementById('filterBtn').onclick = () => {
  const cat = document.getElementById('categoryFilter').value;
  const maxP = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const sort = document.getElementById('sortProducts').value;
  let filtered = products.filter(p => (cat==='all' || p.category===cat) && p.price<=maxP);
  if(sort==='priceAsc') filtered.sort((a,b)=>a.price-b.price);
  else if(sort==='priceDesc') filtered.sort((a,b)=>b.price-a.price);
  else if(sort==='ratingDesc') filtered.sort((a,b)=>b.rating-a.rating);
  renderProducts(filtered);
}
// Initial render
renderProducts(products);
