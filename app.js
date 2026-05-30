var totalBudget = 0;
var totalExpense = 0;
// Budget Set
function totalAmount() {
   var value = document.getElementById("budget_total").value;
   if (value === "") return;
   totalBudget = parseFloat(value);
   document.getElementById("amount_budget").innerText = totalBudget;
   document.getElementById("amount_balance").innerText = totalBudget;
}
// Expense Add
function setExpense() {
   var expenseText = document.getElementById("expense_text").value;
   var expenseAmount = document.getElementById("expense_number").value;
   if (expenseText === "" || expenseAmount === "") return;
   totalExpense += parseFloat(expenseAmount);
   var balance = totalBudget - totalExpense;
   document.getElementById("amount_expense").innerText = totalExpense;
   document.getElementById("amount_balance").innerText = balance
   // list
   var list = document.getElementById("expense_list");
   var item = document.createElement("div");
   item.className = "expense_item";
   item.id = "item_" + totalExpense;
   item.innerHTML =
      "<span class='span1'>" + expenseText + "</span>" +
      "<span class='span2'>" + expenseAmount + "</span>" +
      "<div class='span3'><i class='fa-solid fa-pen-to-square' onclick='editExpense(this)'></i></div>" +
      "<div class='span4'><i class='fa-solid fa-trash' onclick='deleteExpense(this)'></i></div>";
   list.appendChild(item);

   document.getElementById("expense_text").value = "";
   document.getElementById("expense_number").value = "";
   checkEmpty();
}
// Expense Delete
function deleteExpense(icon) {
   var confirm_msg = confirm("Are you sure?");
   if (!confirm_msg) return;
   var item = icon.parentElement.parentElement;
   var amount = parseFloat(item.getElementsByClassName("span2")[0].innerText);
   totalExpense -= amount;
   document.getElementById("amount_expense").innerText = totalExpense;
   document.getElementById("amount_balance").innerText = totalBudget - totalExpense;
   item.remove();
   checkEmpty();
}
// Expense Edit
function editExpense(icon) {
   var item = icon.parentElement.parentElement;
   var name = item.getElementsByClassName("span1")[0].innerText;
   var amount = item.getElementsByClassName("span2")[0].innerText;
   document.getElementById("expense_text").value = name;
   document.getElementById("expense_number").value = amount;
   totalExpense -= parseFloat(amount);
   document.getElementById("amount_expense").innerText = totalExpense;
   document.getElementById("amount_balance").innerText = totalBudget - totalExpense;
   item.remove();
   checkEmpty();
}
// List  Check empty
function checkEmpty() {
   var list = document.getElementById("expense_list");
   var items = list.getElementsByClassName("expense_item");
   if (items.length === 0) {
      if (!document.getElementById("no_record")) {
         var msg = document.createElement("p");
         msg.id = "no_record";
         msg.innerText = "No Record Found";
         list.appendChild(msg);
      }
   } else {
      var msg = document.getElementById("no_record");
      if (msg) msg.remove();
   }
}
// page load
checkEmpty();