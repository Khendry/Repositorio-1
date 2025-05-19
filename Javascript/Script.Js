function mostrarProductos() {
  fetch('http://localhost:3000/productos')
  .then(response => response.json())
  .then(data => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        data.forEach(product => {
          const productItem = document.createElement('li');
          productItem.textContent = `${product.nombre}  $${product.precio}`;
          productList.appendChild(productItem);
          document.getElementById('product-list').style.display = 'block';
        });
    })
      .catch(error => {
          console.error('Error al obtener productos:', error);
        });
    }

    document.getElementById('btn').addEventListener('click', mostrarProductos);

    document.getElementById("productForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const precio = document.getElementById("precio").value;
      
        fetch('http://localhost:3000/api/agregar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, precio })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          alert(data.message);
          mostrarProductos(); // Actualizar la lista
        })
        .catch(err => console.error(err));
      });

      document.getElementById('buscar-btn').addEventListener('click', () => {
        const id = document.getElementById('buscar-id').value;
      
        fetch(`http://localhost:3000/productos/${id}`)
          .then(res => {
            if (!res.ok) {
              throw new Error('Producto no encontrado');
            }
            return res.json();  
          })
          .then(producto => {
            const resultado = document.getElementById('resultado-busqueda');
            resultado.innerHTML = ''; // limpiar resultados anteriores
            const item = document.createElement('li');
            item.textContent = `${producto.nombre}  $${producto.precio}`;
            resultado.appendChild(item);
            document.getElementById('resultado-busqueda').style.display = 'block';
          })
          .catch(err => {
            alert(err.message);
          });
      });

    function ocultarlista()
    {
        document.getElementById('product-list').style.display = 'none';   
        document.getElementById('resultado-busqueda').style.display = 'none'; 
    }
    document.getElementById('back').addEventListener('click', ocultarlista);

    document.getElementById('product-list').style.display = 'none';    