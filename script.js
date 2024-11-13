// Fungsi untuk format angka menjadi format mata uang
function formatCurrency(amount) {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace('Rp', 'Rp ').trim();
}

// Variabel untuk menyimpan data pengguna
let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;
let weeklyLimit = localStorage.getItem('weeklyLimit') ? parseInt(localStorage.getItem('weeklyLimit')) : 0;
let weeklyExpense = localStorage.getItem('weeklyExpense') ? parseInt(localStorage.getItem('weeklyExpense')) : 0;
let goalAmount = localStorage.getItem('goalAmount') ? parseInt(localStorage.getItem('goalAmount')) : 0;
let goalName = localStorage.getItem('goalName') ? localStorage.getItem('goalName') : '';

// Menampilkan data awal dengan format uang
document.getElementById('balance').innerText = formatCurrency(balance);
document.getElementById('expense-status').innerText = `Pengeluaran Minggu Ini: ${formatCurrency(weeklyExpense)}`;
document.getElementById('goal-progress').innerText = goalName ? `${goalName}: ${formatCurrency(balance)} dari ${formatCurrency(goalAmount)}` : 'Belum ada tujuan';

// Fungsi untuk menambah pemasukan
function updateBalance() {
    const deposit = parseInt(document.getElementById('deposit').value);
    if (isNaN(deposit) || deposit <= 0) {
        alert("Masukkan jumlah pemasukan yang valid.");
        return;
    }
    balance += deposit;
    localStorage.setItem('balance', balance);
    document.getElementById('balance').innerText = formatCurrency(balance);
    document.getElementById('deposit').value = '';
}

// Fungsi untuk menambah pengeluaran
function addExpense() {
    const expense = parseInt(document.getElementById('expense').value);
    if (isNaN(expense) || expense <= 0) {
        alert("Masukkan jumlah pengeluaran yang valid.");
        return;
    }
    if (weeklyExpense + expense > weeklyLimit) {
        alert("Pengeluaran melebihi batas mingguan.");
        return;
    }
    balance -= expense;
    weeklyExpense += expense;
    localStorage.setItem('balance', balance);
    localStorage.setItem('weeklyExpense', weeklyExpense);
    document.getElementById('balance').innerText = formatCurrency(balance);
    document.getElementById('expense-status').innerText = `Pengeluaran Minggu Ini: ${formatCurrency(weeklyExpense)}`;
    document.getElementById('expense').value = '';
}

// Fungsi untuk mengatur batas pengeluaran mingguan
function setWeeklyLimit() {
    const limit = parseInt(document.getElementById('weekly-expense-input').value);
    if (isNaN(limit) || limit <= 0) {
        alert("Masukkan batas pengeluaran yang valid.");
        return;
    }
    weeklyLimit = limit;
    localStorage.setItem('weeklyLimit', weeklyLimit);
    document.getElementById('weekly-expense-input').value = '';
}

// Fungsi untuk mengatur tujuan tabungan
function setGoal() {
    const goal = document.getElementById('goal-name').value;
    const amount = parseInt(document.getElementById('goal-amount').value);
    if (!goal || isNaN(amount) || amount <= 0) {
        alert("Masukkan nama dan jumlah tujuan yang valid.");
        return;
    }
    goalName = goal;
    goalAmount = amount;
    localStorage.setItem('goalName', goalName);
    localStorage.setItem('goalAmount', goalAmount);
    document.getElementById('goal-progress').innerText = `${goalName}: ${formatCurrency(balance)} dari ${formatCurrency(goalAmount)}`;
    document.getElementById('goal-name').value = '';
    document.getElementById('goal-amount').value = '';
}
// Fungsi untuk reset semua data
function resetData() {
    // Menghapus semua data yang tersimpan di localStorage
    localStorage.removeItem('balance');
    localStorage.removeItem('weeklyLimit');
    localStorage.removeItem('weeklyExpense');
    localStorage.removeItem('goalAmount');
    localStorage.removeItem('goalName');

    // Mengatur ulang nilai variabel
    balance = 0;
    weeklyLimit = 0;
    weeklyExpense = 0;
    goalAmount = 0;
    goalName = '';

    // Menampilkan ulang nilai default
    document.getElementById('balance').innerText = formatCurrency(balance);
    document.getElementById('expense-status').innerText = `Pengeluaran Minggu Ini: ${formatCurrency(weeklyExpense)}`;
    document.getElementById('goal-progress').innerText = goalName ? `${goalName}: ${formatCurrency(balance)} dari ${formatCurrency(goalAmount)}` : 'Belum ada tujuan';
    
    // Mengosongkan form input
    document.getElementById('deposit').value = '';
    document.getElementById('expense').value = '';
    document.getElementById('weekly-expense-input').value = '';
    document.getElementById('goal-name').value = '';
    document.getElementById('goal-amount').value = '';
    
    alert('Semua data telah direset!');
}
