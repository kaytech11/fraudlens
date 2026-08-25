export interface Account {
  accountNumber: string;
  createdAt: string | null;
  currency: string;
  id: string;
  status: string;
  type: string;
}

export interface Customer {
  email: string;
  id: string;
  name: string;
  riskLevel: string;
}

export interface AccountResponse {
  account: Account;
  customer: Customer;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  channel: string;
  status: string;
  timestamp: string;
  type: string;
}

export interface TransactionResponse {
  accountId: string;
  transactions: Array<{
    transaction: Transaction;
    receiver: {
      id: string;
      accountNumber: string;
    };
    device: {
      id: string;
      type: string;
    } | null;
    merchant: {
      id: string;
      name: string;
    } | null;
    location: {
      id: string;
      city: string;
      country: string;
    } | null;
  }>;
}

export interface Connection {
  accountId: string;
  hops: number;
}

export interface ConnectionsResponse {
  accountId: string;
  connections: Connection[];
}

export interface SharedDevice {
  device: {
    id: string;
    fingerprint: string;
    type: string;
  };
  customer: {
    id: string;
    name: string;
    riskLevel: string;
  };
  account: {
    id: string;
    accountNumber: string;
    status: string;
  };
}

export interface SharedDevicesResponse {
  accountId: string;
  sharedDevices: SharedDevice[];
}

export interface RiskIndicators {
  accountId: string;
  customerName: string;
  customerRiskLevel: string;
  transactionCount: number;
  totalTransactionAmount: number;
  sharedDeviceCount: number;
  connectedCustomers: number;
  connectedAccounts: number;
}

export interface SuspiciousConnection {
  accountId: string;
  accountNumber: string;
  customerId: string;
  customerName: string;
  riskLevel: string;
}

export interface SuspiciousConnectionsResponse {
  accountId: string;
  suspiciousConnections: SuspiciousConnection[];
}