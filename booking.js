const payBtn = document.getElementById("payBtn");

if (payBtn) {
  payBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const service = document.getElementById("service").value;

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    let amount = 0;

    switch (service) {
      case "Cuts & Styling":
        amount = 5000;
        break;

      case "Colour & Highlights":
        amount = 12000;
        break;

      case "Beard & Grooming":
        amount = 3000;
        break;

      case "Hair Treatments":
        amount = 8000;
        break;

      case "Nail Care":
        amount = 4000;
        break;

      case "Manicure":
        amount = 3500;
        break;

      case "Pedicure":
        amount = 4500;
        break;

      case "Bridal & Events":
        amount = 25000;
        break;

      default:
        alert("Please select a service.");
        return;
    }

    let handler = PaystackPop.setup({
      key: "pk_test_bb92d9c88474632fd9134917462df086681a999e",
      email: email,
      amount: amount * 100, // Kobo
      currency: "NGN",
      ref: "BOOK_" + Date.now(),

      callback: function (response) {
        alert("Payment Successful!");
        window.location.href = "success.html";
      },

      onClose: function () {
        alert("Payment cancelled.");
      }
    });

    handler.openIframe();
  });
}