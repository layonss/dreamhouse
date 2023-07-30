import React, { useState, useEffect} from 'react';
import './App.css';
import product1Image from './imagens/foto1.jpg';
import product2Image from './imagens/foto2.jpg';
import product3Image from './imagens/foto3.jpg';
import product4Image from './imagens/foto4.jpg';
import product5Image from './imagens/foto5.jpg';
import product6Image from './imagens/foto6.jpg';

const productsData = [
  { id: 1, name: 'Choose Joy', description: 'Escolha a alegria, não importa o que aconteça. ', price: 10.99, image: product1Image },
  { id: 2, name: 'Corações com Olhos', description: 'Através dos olhos do coração, vemos o verdadeiro sentido da vida: Amor e conexão. ', price: 26.99, image: product2Image },
  { id: 3, name: 'Tira o coração do solo infértil', description: 'Tirar o coração de um solo infértil é o ato corajoso de buscar florescer onde ninguém acreditava que fosse possível, transformando adversidade em oportunidade e crescendo além das limitações impostas. ', price: 17.99, image: product3Image },
  { id: 4, name: 'Costela de Adão', description: 'Em um jardim de possibilidades, seja sempre a força que floresce. ', price: 15.99, image: product4Image },
  { id: 5, name: 'Sunshine', description: 'O sunshine ilumina os caminhos da vida, espalhando calor e esperança por onde passa, despertando sorrisos e abraçando corações. ', price: 19.99, image: product5Image },
  { id: 6, name: 'Tulipas', description: 'Choram as rosas', price: 18.99, image: product6Image }
];

function App() {
  const [products, setProducts] = useState(productsData);

  const [cart, setCart] = useState(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
    return cartFromLocalStorage ? cartFromLocalStorage : [];
  });

  const [cartCount, setCartCount] = useState(0);

   const calculateCartCount = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingCartItem = prevCart.find((item) => item.id === product.id);

      if (existingCartItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setCartCount(calculateCartCount()); 
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    setCartCount(calculateCartCount()); 
    setCartCount((prevCount) => prevCount - 1);
  };
  
  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
      setCartCount(calculateCartCount(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const closeCart = () => {
    setShowCart(false);
  }

  return (
    <div className="App">
      <div className="navbar">
        <h1 id='name'>DreamHouse</h1>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Produtos</a></li>
          <li onClick={toggleCart} className="cart-icon">
            <span>Cart ({cartCount})</span>
          </li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
      <hr></hr>
      <h1 id='tittle'>Produtos Disponíveis</h1>
      <hr></hr>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">	
           <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Preço: R${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-overlay">
          <div className="cart">
            <h2>Carrinho de Compras</h2>
            {cart.length > 0 ? (
              <>
                {cart.map((product) => (
                  <div key={product.id} className="cart-item">
                    <p>{product.name}</p>
                    <p>  Quantidade: {product.quantity}</p>
                    <p> Preço: R${(product.price * product.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(product.id)}>Remover do Carrinho</button>
                  </div>
                ))}
                <p className="total">Total da Compra: R${calculateTotal()}</p>
                <button className='buttonclose' onClick={closeCart}>Fechar Carrinho</button>
              </>
            ) : (
              <React.Fragment> 
                <p>Seu carrinho está vazio.</p>
                <button className='buttonclose' onClick={closeCart}>Fechar Carrinho</button>
              </React.Fragment>
            )}
          </div>
        </div>
      )}

      <div className="footer">
        <p>Todos os direitos reservados Layon S. &copy; DreamHouse</p>
      </div>
    </div>
  );
}

export default App;