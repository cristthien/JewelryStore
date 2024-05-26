document.addEventListener('DOMContentLoaded', function() {
    const sizeRadio = document.getElementById('sizeRadio');
    const nonSizeRadio = document.getElementById('nonSizeRadio');
    const btnAddStock = document.querySelector('.admin__add-stock-btn');
    const stockSection = document.getElementById('stockSection');

    sizeRadio.addEventListener('click', function() {
        btnAddStock.style.display = 'block';
        while (stockSection.firstChild) {
            stockSection.removeChild(stockSection.firstChild);
        }
        const newStockItem = document.createElement('div');
        newStockItem.className = 'col-6 admin__product-manage-stock-item';
        newStockItem.innerHTML = `
            <div class="wrapper wrapper-custom">
                <h2>Stock</h2>
                <textarea placeholder="Stock..." required></textarea>
            </div>
            <div class="wrapper wrapper-custom">
                <h2>Size</h2>
                <textarea placeholder="Size..." required></textarea>
            </div>
        `;
        stockSection.appendChild(newStockItem);
    });

    nonSizeRadio.addEventListener('click', function() {
        btnAddStock.style.display = 'none';
        while (stockSection.firstChild) {
            stockSection.removeChild(stockSection.firstChild);
        }
        const newStockItem = document.createElement('div');
        newStockItem.className = 'col-6 admin__product-manage-stock-item';
        newStockItem.innerHTML = `
            <div class="wrapper wrapper-custom">
                <h2>Stock</h2>
                <textarea placeholder="Stock..." required></textarea>
            </div>
        `;
        stockSection.appendChild(newStockItem);
    });

    btnAddStock.addEventListener('click', function() {
        const newStockItem = document.createElement('div');
        newStockItem.className = 'col-6 admin__product-manage-stock-item';
        newStockItem.innerHTML = `
            <div class="wrapper wrapper-custom">
                <h2>Stock</h2>
                <textarea placeholder="Stock..." required></textarea>
            </div>
            <div class="wrapper wrapper-custom">
                <h2>Size</h2>
                <textarea placeholder="Size..." required></textarea>
            </div>
        `;
        stockSection.appendChild(newStockItem);
    });
});