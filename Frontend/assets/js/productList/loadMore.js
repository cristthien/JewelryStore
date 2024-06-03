document.addEventListener('DOMContentLoaded', function() {
    let itemsPerPage = 12;
    let currentPage = 0;
    let productItems = document.querySelectorAll('.product-item-col');

    function showItems(page) {
        let start = page * itemsPerPage;
        let end = start + itemsPerPage;

        productItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'block';
            }
        });
    }

    // Hiển thị 4 sản phẩm đầu tiên khi trang được tải
    showItems(currentPage);

    document.getElementById('load-more').addEventListener('click', function() {
        currentPage++;
        showItems(currentPage);
    });

});
