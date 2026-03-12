const prices = {

    ao: 150000,
    quan: 200000,
    giay: 500000

}

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const deliveryDate = document.getElementById("deliveryDate")
const address = document.getElementById("address")
const note = document.getElementById("note")

const total = document.getElementById("total")
const charCount = document.getElementById("charCount")

const confirmBox = document.getElementById("confirmBox")
const orderSummary = document.getElementById("orderSummary")

const successMsg = document.getElementById("successMsg")

function showError(id, msg) {
    document.getElementById(id).innerText = msg
}

function clearError(id) {
    document.getElementById(id).innerText = ""
}

function calculateTotal() {

    let p = product.value
    let q = Number(quantity.value)

    if (prices[p] && q) {

        let money = prices[p] * q
        total.innerText = money.toLocaleString("vi-VN")

    } else {

        total.innerText = "0"

    }

}

product.addEventListener("change", calculateTotal)
quantity.addEventListener("input", calculateTotal)


note.addEventListener("input", () => {

    let len = note.value.length

    charCount.innerText = len + "/200"

    charCount.style.color = len > 200 ? "red" : "black"

    showError("noteError", len > 200 ? "Ghi chú không quá 200 ký tự" : "")

})


document.getElementById("orderForm").addEventListener("submit", (e) => {

    e.preventDefault()

    let valid = true

    if (product.value === "") {
        showError("productError", "Chọn sản phẩm")
        valid = false
    } else clearError("productError")


    let q = Number(quantity.value)

    if (q < 1 || q > 99) {
        showError("quantityError", "1 - 99")
        valid = false
    } else clearError("quantityError")


    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let max = new Date()
    max.setDate(today.getDate() + 30)

    let date = new Date(deliveryDate.value)

    if (!deliveryDate.value || date < today || date > max) {

        showError("dateError", "Ngày không hợp lệ")
        valid = false

    } else clearError("dateError")


    if (address.value.trim().length < 10) {

        showError("addressError", "Địa chỉ >= 10 ký tự")
        valid = false

    } else clearError("addressError")


    if (note.value.length > 200) {

        showError("noteError", "<= 200 ký tự")
        valid = false

    } else clearError("noteError")


    let payment = document.querySelector("input[name='payment']:checked")

    if (!payment) {

        showError("paymentError", "Chọn thanh toán")
        valid = false

    } else clearError("paymentError")


    if (valid) {

        let name = product.options[product.selectedIndex].text

        orderSummary.innerHTML =
            "<b>Xác nhận đặt hàng?</b><br><br>" +
            "Sản phẩm: " + name + "<br>" +
            "Số lượng: " + quantity.value + "<br>" +
            "Tổng tiền: " + total.innerText + " VNĐ<br>" +
            "Ngày giao: " + deliveryDate.value

        confirmBox.style.display = "block"

    }

})


document.getElementById("confirmBtn").onclick = () => {

    confirmBox.style.display = "none"
    successMsg.style.display = "block"

}

document.getElementById("cancelBtn").onclick = () => {

    confirmBox.style.display = "none"

}