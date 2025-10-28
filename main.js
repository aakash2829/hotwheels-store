$(function() {
    // Load and display Hot Wheels inventory
    function loadInventory() {
        $.get('Hot Wheels Inventory.csv', function(data) {
            const lines = data.split('\n');
            const headers = lines[0].split(',');
            const cars = [];

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i]) continue;
                const currentLine = lines[i].split(',');
                const car = {};

                headers.forEach((header, index) => {
                    car[header.trim()] = currentLine[index] ? currentLine[index].trim() : '';
                });

                cars.push(car);
            }

            // Create HTML for each car
            let html = '<div class="row">';
cars.forEach(car => {
                const imageIndex = Math.floor(Math.random() * 7); // Use one of the existing images
                html += `
                    <div class="col-4 col-6-medium col-12-small">
                        <article class="box style2">
                            <a href="#" class="image featured"><img src="images/pic0${imageIndex}.jpg" alt="" /></a>
                            <h3><a href="#">${car.Brand} ${car.Model}</a></h3>
                            <p>Series: ${car.Series}<br>
                               Color: ${car.Color}<br>
                               In Stock: ${car['In Stock']}<br>
                               Price: $${car['Selling Price']}</p>
                        </article>
                    </div>
                `;
            });
            html += '</div>'
            // Insert the HTML after the header in the portfolio section
            $('#portfolio header').after(html);
        });
    }

    // Load inventory when page loads
    loadInventory();
});
