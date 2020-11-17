import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.calculateTransaction('income');
    const outcome = this.calculateTransaction('outcome');
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  public calculateTransaction(type: string): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, next) => total + next.value, 0);
  }
}

export default TransactionsRepository;
