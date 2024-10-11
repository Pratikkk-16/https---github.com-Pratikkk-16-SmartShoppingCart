const products = {
    "123456": { name: "Product 1", price: 10.99, weight: "1kg" },
    "789012": { name: "Product 2", price: 5.49, weight: "500g" },
    "345678": { name: "Product 3", price: 2.99, weight: "200g" }
};

let bill = [];
let totalAmount = 0.0;

function displayProductInfo(barcode) {
    const product = products[barcode];
    if (product) {
        document.getElementById("productName").textContent = `Name: ${product.name}`;
        document.getElementById("productPrice").textContent = `Price: $${product.price.toFixed(2)}`;
        document.getElementById("productWeight").textContent = `Weight: ${product.weight}`;
    } else {
        alert("Product not found!");
    }
}

function addToBill() {
    const barcode = document.getElementById("barcode").value;
    const product = products[barcode];
    if (product) {
        bill.push(product);
        totalAmount += product.price;
        updateBillList();
        document.getElementById("barcode").value = "";
    } else {
        alert("Product not found!");
    }
}

function deleteFromBill() {
    const barcode = prompt("Scan the product barcode to delete:");
    const product = products[barcode];
    if (product) {
        const index = bill.findIndex(item => item.name === product.name);
        if (index > -1) {
            bill.splice(index, 1);
            totalAmount -= product.price;
            updateBillList();
        } else {
            alert("Product not in bill!");
        }
    } else {
        alert("Product not found!");
    }
}

function updateBillList() {
    const billList = document.getElementById("billList");
    billList.innerHTML = "";
    bill.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        billList.appendChild(li);
    });
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
}

function printBill() {
    const printBillList = document.getElementById("printBillList");
    printBillList.innerHTML = "";
    bill.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        printBillList.appendChild(li);
    });
    document.getElementById("printTotalAmount").textContent = totalAmount.toFixed(2);
    generateQRCode();
    document.getElementById("printModal").style.display = "flex";
}

function generateQRCode() {
    const qrCodeImage = document.getElementById("qrCode");
    const qrText = `Total: $${totalAmount.toFixed(2)}`;
    qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText)}`;
}

function closeModal() {
    document.getElementById("printModal").style.display = "none";
}

// Listen for barcode scanner input
document.getElementById("barcode").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const barcode = event.target.value;
        displayProductInfo(barcode);
    }
});
