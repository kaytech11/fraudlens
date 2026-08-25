import type {
  AccountResponse,
  ConnectionsResponse,
  RiskIndicators,
  SharedDevicesResponse,
  TransactionResponse,
  SuspiciousConnectionsResponse,
} from "../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ;

async function request<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      error.message || "Request failed"
    );
  }

  return response.json();
}

export function getAccount(
  accountId: string
): Promise<AccountResponse> {
  return request<AccountResponse>(
    `/accounts/${accountId}`
  );
}

export function getTransactions(
  accountId: string
): Promise<TransactionResponse> {
  return request<TransactionResponse>(
    `/accounts/${accountId}/transactions`
  );
}

export function getConnections(
  accountId: string
): Promise<ConnectionsResponse> {
  return request<ConnectionsResponse>(
    `/investigations/accounts/${accountId}/connections`
  );
}

export function getSharedDevices(
  accountId: string
): Promise<SharedDevicesResponse> {
  return request<SharedDevicesResponse>(
    `/investigations/accounts/${accountId}/shared-devices`
  );
}

export function getRiskIndicators(
  accountId: string
): Promise<RiskIndicators> {
  return request<RiskIndicators>(
    `/investigations/accounts/${accountId}/risk`
  );
}

export function getSuspiciousConnections(
  accountId: string
): Promise<SuspiciousConnectionsResponse> {
  return request<SuspiciousConnectionsResponse>(
    `/investigations/accounts/${accountId}/suspicious-connections`
  );
}

