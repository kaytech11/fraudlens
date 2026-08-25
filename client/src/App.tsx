import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, Search, ShieldCheck, Users, Smartphone, Network, Activity, CircleDollarSign, GitBranch, } from "lucide-react";

import {
  getAccount, getTransactions, getConnections, getSharedDevices, getRiskIndicators, getSuspiciousConnections,
} from "./services/api";

import type {
  AccountResponse,
  TransactionResponse,
  ConnectionsResponse,
  SharedDevicesResponse,
  RiskIndicators,
  SuspiciousConnectionsResponse
} from "./types/api";

import FraudGraph from "./components/FraudGraph";

function App() {
  const [account, setAccount] =
    useState<AccountResponse | null>(null);

  const [transactions, setTransactions] =
    useState<TransactionResponse | null>(null);

  const [connections, setConnections] =
    useState<ConnectionsResponse | null>(null);

  const [sharedDevices, setSharedDevices] =
    useState<SharedDevicesResponse | null>(null);

  const [riskIndicators, setRiskIndicators] =
    useState<RiskIndicators | null>(null);

  const [suspiciousConnections, setSuspiciousConnections] =
    useState<SuspiciousConnectionsResponse | null>(null);

  const [accountId, setAccountId] = useState("A001");
  const [search, setSearch] = useState("A001");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function investigate(id: string) {
    setLoading(true);
    setError("");

    try {
      const [
        accountData,
        transactionData,
        connectionData,
        deviceData,
        riskData,
        suspiciousData,
      ] = await Promise.all([
        getAccount(id),
        getTransactions(id),
        getConnections(id),
        getSharedDevices(id),
        getRiskIndicators(id),
        getSuspiciousConnections(id),
      ]);

      setAccount(accountData);
      setTransactions(transactionData);
      setConnections(connectionData);
      setSharedDevices(deviceData);
      setRiskIndicators(riskData);
      setSuspiciousConnections(suspiciousData);
    } catch (err) {
      setAccount(null);
      setTransactions(null);
      setConnections(null);
      setSharedDevices(null);
      setRiskIndicators(null);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load investigation"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    investigate(accountId);
  }, []);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    const id = search.trim();

    if (!id) return;

    setAccountId(id);
    investigate(id);
  }

  const transactionCount =
    riskIndicators?.transactionCount ?? 0;

  const totalTransactionAmount =
    riskIndicators?.totalTransactionAmount ?? 0;

  const connectedAccountCount =
    riskIndicators?.connectedAccounts ?? 0;

  const connectedCustomerCount =
    riskIndicators?.connectedCustomers ?? 0;

  const sharedDeviceCount =
    riskIndicators?.sharedDeviceCount ?? 0;

  const riskScore =
    Math.min(
      100,
      sharedDeviceCount * 25 +
      connectedCustomerCount * 15 +
      connectedAccountCount * 10 +
      (transactionCount >= 5 ? 15 : 0) +
      (totalTransactionAmount >= 1000000 ? 15 : 0)
    );

  const overallRisk =
    riskScore >= 70
      ? "HIGH"
      : riskScore >= 40
        ? "MEDIUM"
        : "LOW";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}

      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                FraudLens
              </h1>

              <p className="text-xs text-slate-500">
                Graph-based transaction intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            System operational
          </div>
        </div>
      </header>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Search */}

        <section className="mb-8">
          <div className="mb-3">
            <h2 className="text-xl font-semibold">
              Investigate an account
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Explore transactions, relationships and
              potential fraud indicators.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex max-w-2xl gap-3"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Enter account ID e.g. A001"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 text-sm font-medium transition hover:bg-blue-500"
            >
              Investigate
            </button>
          </form>
        </section>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-400">
            Loading investigation...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-900/50 bg-red-950/30 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle
                size={20}
                className="text-red-400"
              />

              <div>
                <p className="font-medium text-red-300">
                  Investigation failed
                </p>

                <p className="mt-1 text-sm text-red-400/80">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Account */}

        {!loading && !error && account && (
          <>
            {/* Account heading */}

            <section className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">
                    {account.customer.name}
                  </h2>

                  <RiskBadge
                    risk={account.customer.riskLevel}
                  />
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Account {account.account.accountNumber}
                  {" · "}
                  {account.account.type}
                  {" · "}
                  {account.account.currency}
                </p>
              </div>

              <div className="text-right text-sm text-slate-500">
                Customer ID{" "}
                <span className="text-slate-300">
                  {account.customer.id}
                </span>
              </div>
            </section>

            {/* Investigation metrics */}

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Transactions"
                value={String(transactionCount)}
                icon={<Activity size={18} />}
              />

              <MetricCard
                label="Transaction volume"
                value={`${account.account.currency} ${totalTransactionAmount.toLocaleString()}`}
                icon={<CircleDollarSign size={18} />}
              />

              <MetricCard
                label="Connected accounts"
                value={String(connectedAccountCount)}
                icon={<Network size={18} />}
              />

              <MetricCard
                label="Shared devices"
                value={String(sharedDeviceCount)}
                icon={<Smartphone size={18} />}
              />
            </section>

            {/* Investigation risk summary */}

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Investigation assessment
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold">
                    {overallRisk} risk
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Explainable risk assessment based on graph and transaction signals.
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-xs text-slate-500">
                    Risk score
                  </p>

                  <p className="mt-1 text-4xl font-bold">
                    {riskScore}
                    <span className="text-lg text-slate-600">
                      /100
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-red-500 transition-all"
                  style={{
                    width: `${riskScore}%`,
                  }}
                />
              </div>
            </section>

            {/* Risk indicators */}

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Risk indicators
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Signals identified from the account's
                    graph relationships.
                  </p>
                </div>

                <AlertTriangle
                  size={20}
                  className="text-amber-400"
                />
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {sharedDeviceCount > 0 && (
                  <RiskItem
                    title="Shared device detected"
                    description={`This account is associated with ${sharedDeviceCount} shared device(s).`}
                  />
                )}

                {connectedAccountCount > 0 && (
                  <RiskItem
                    title="Connected account network"
                    description={`The graph contains ${connectedAccountCount} connected account(s).`}
                  />
                )}

                {connectedCustomerCount > 0 && (
                  <RiskItem
                    title="Customer relationship detected"
                    description={`The account is connected to ${connectedCustomerCount} other customer(s) through the graph.`}
                  />
                )}

                {sharedDeviceCount === 0 &&
                  connectedAccountCount === 0 &&
                  connectedCustomerCount === 0 && (
                    <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4">
                      <p className="text-sm font-medium text-emerald-400">
                        No significant relationship signals detected
                      </p>
                    </div>
                  )}
              </div>
            </section>

            {/* Investigation sections */}

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* Network */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center gap-3">
                  <Network
                    size={20}
                    className="text-blue-400"
                  />

                  <div>
                    <h3 className="font-semibold">
                      Network investigation
                    </h3>

                    <p className="text-xs text-slate-500">
                      Connected accounts and graph paths
                    </p>
                  </div>
                </div>

                <FraudGraph
                  accountId={account.account.id}
                  customerName={account.customer.name}
                  connections={connections?.connections ?? []}
                  sharedDevices={sharedDevices?.sharedDevices ?? []}
                />

                <div className="mt-6 space-y-3">
                  {connections?.connections?.length ? (
                    connections.connections.map(
                      (connection) => (
                        <div
                          key={connection.accountId}
                          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                              <GitBranch size={18} />
                            </div>

                            <div>
                              <p className="text-sm font-medium">
                                Account{" "}
                                {connection.accountId}
                              </p>

                              <p className="text-xs text-slate-500">
                                Connected through transaction graph
                              </p>
                            </div>
                          </div>

                          <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-400">
                            {connection.hops} hops
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <EmptyState
                      icon={<Network size={28} />}
                      message="No connected accounts found."
                    />
                  )}
                </div>
              </div>

              {/* Shared devices */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center gap-3">
                  <Smartphone
                    size={20}
                    className="text-amber-400"
                  />

                  <div>
                    <h3 className="font-semibold">
                      Shared devices
                    </h3>

                    <p className="text-xs text-slate-500">
                      Devices linked across customers
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {sharedDevices?.sharedDevices?.length ? (
                    sharedDevices.sharedDevices.map(
                      (item) => (
                        <div
                          key={`${item.device.id}-${item.account.id}`}
                          className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                                <Smartphone size={18} />
                              </div>

                              <div>
                                <p className="text-sm font-medium">
                                  {item.device.id}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {item.device.type} device
                                </p>
                              </div>
                            </div>

                            <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs text-red-400">
                              {item.customer.riskLevel}
                            </span>
                          </div>

                          <div className="mt-4 border-t border-slate-800 pt-3">
                            <p className="text-xs text-slate-500">
                              Also associated with
                            </p>

                            <p className="mt-1 text-sm text-slate-300">
                              {item.customer.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              Account{" "}
                              {item.account.accountNumber}
                            </p>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <EmptyState
                      icon={<Smartphone size={28} />}
                      message="No shared devices found."
                    />
                  )}
                </div>
              </div>
            </section>

            {/* Connected customers */}

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3">
                <Users
                  size={20}
                  className="text-purple-400"
                />

                <div>
                  <h3 className="font-semibold">
                    Connected customers
                  </h3>

                  <p className="text-xs text-slate-500">
                    Customers discovered through the transaction network
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {connections?.connections?.length ? (
                  connections.connections.map(
                    (connection) => (
                      <div
                        key={`customer-${connection.accountId}`}
                        className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            Account {connection.accountId}
                          </p>

                          <Users
                            size={16}
                            className="text-slate-500"
                          />
                        </div>

                        <p className="mt-2 text-xs text-slate-500">
                          {connection.hops}-hop relationship
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <EmptyState
                      icon={<Users size={28} />}
                      message="No connected customers found."
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Suspicious connections */}

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    High-risk connections
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    High-risk customers and accounts connexted through the transaction graph.
                  </p>
                </div>

                <AlertTriangle
                  size={20}
                  className="text-red-400"
                />
              </div>

              <div className="mt-6 space-y-3">
                {suspiciousConnections?.suspiciousConnections?.length ? (
                  suspiciousConnections.suspiciousConnections.map(
                    (connection) => (
                      <div
                        key={connection.accountId}
                        className="rounded-xl border border-red-900/40 bg-red-950/10 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-200">
                              {connection.customerName}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Customer {connection.customerId}
                              {" · "}
                              Account {connection.accountNumber}
                            </p>
                          </div>

                          <RiskBadge
                            risk={connection.riskLevel}
                          />
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs text-red-400">
                          <AlertTriangle size={14} />

                          Connected to investigated account
                          through the transaction graph.
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4">
                    <p className="text-sm font-medium text-emerald-400">
                      No suspicious connections detected.
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      No high-risk connected customers were found.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Transactions */}

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div>
                <h3 className="font-semibold">
                  Transaction activity
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Transactions associated with this account.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto">
                {transactions?.transactions?.length ? (
                  <table className="w-full min-w-190 text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs text-slate-500">
                        <th className="pb-3 font-medium">
                          Transaction
                        </th>

                        <th className="pb-3 font-medium">
                          Amount
                        </th>

                        <th className="pb-3 font-medium">
                          Direction
                        </th>

                        <th className="pb-3 font-medium">
                          Channel
                        </th>

                        <th className="pb-3 font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.transactions.map(
                        ({
                          transaction,
                          receiver,
                        }) => (
                          <tr
                            key={transaction.id}
                            className="border-b border-slate-800/70 last:border-0"
                          >
                            <td className="py-4 font-medium">
                              {transaction.id}
                            </td>

                            <td className="py-4">
                              {transaction.currency}{" "}
                              {transaction.amount.toLocaleString()}
                            </td>

                            <td className="py-4 text-slate-400">
                              {account.account.id}

                              <ArrowRight
                                size={14}
                                className="mx-2 inline"
                              />

                              {receiver.accountNumber}
                            </td>

                            <td className="py-4 text-slate-400">
                              {transaction.channel}
                            </td>

                            <td className="py-4">
                              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState
                    icon={<Activity size={28} />}
                    message="No transactions found."
                  />
                )}
              </div>
            </section>

            {/* Investigation context */}

            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">
                    Investigation context
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    FraudLens analyzes relationships between
                    accounts, transactions, devices and customers
                    using a graph-based data model.
                  </p>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-slate-600"
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

/* Metric card */

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function MetricCard({
  label,
  value,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {label}
        </span>

        <span className="text-slate-500">
          {icon}
        </span>
      </div>

      <p className="mt-4 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}

/* Risk item */

function RiskItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4">
      <div className="flex gap-3">
        <AlertTriangle
          size={18}
          className="mt-0.5 shrink-0 text-amber-400"
        />

        <div>
          <p className="text-sm font-medium text-amber-300">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Risk badge */

function RiskBadge({
  risk,
}: {
  risk: string;
}) {
  const isHigh = risk.toUpperCase() === "HIGH";
  const isMedium = risk.toUpperCase() === "MEDIUM";

  const className = isHigh
    ? "bg-red-500/10 text-red-400"
    : isMedium
      ? "bg-amber-500/10 text-amber-400"
      : "bg-emerald-500/10 text-emerald-400";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {risk} RISK
    </span>
  );
}

/* Empty state */

function EmptyState({
  icon,
  message,
}: {
  icon: React.ReactNode;
  message: string;
}) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950 p-6 text-center">
      <div>
        <div className="flex justify-center text-slate-600">
          {icon}
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}
Network
export default App;