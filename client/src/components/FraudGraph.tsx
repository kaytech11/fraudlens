import { useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

interface FraudGraphProps {
  accountId: string;
  customerName: string;
  connections: {
    accountId: string;
    hops: number;
  }[];
  sharedDevices: {
    device: {
      id: string;
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
  }[];
}

interface GraphNode {
  id: string;
  label: string;
  type: "account" | "customer" | "device";
  riskLevel?: string;
}

interface GraphLink {
  source: string;
  target: string;
  label: string;
}

export default function FraudGraph({
  accountId,
  customerName,
  connections,
  sharedDevices,
}: FraudGraphProps) {
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    const addNode = (node: GraphNode) => {
      if (!nodes.some((existing) => existing.id === node.id)) {
        nodes.push(node);
      }
    };

    /*
     * Main account
     */

    addNode({
      id: accountId,
      label: accountId,
      type: "account",
    });

    /*
     * Main customer
     */

    const customerId = `customer-${customerName}`;

    addNode({
      id: customerId,
      label: customerName,
      type: "customer",
    });

    links.push({
      source: customerId,
      target: accountId,
      label: "OWNS",
    });

    /*
     * Connected accounts
     */

    connections.forEach((connection) => {
      addNode({
        id: connection.accountId,
        label: connection.accountId,
        type: "account",
      });

      links.push({
        source: accountId,
        target: connection.accountId,
        label: `${connection.hops} HOPS`,
      });
    });

    /*
     * Shared devices
     */

    sharedDevices.forEach((item) => {
      const deviceId = `device-${item.device.id}`;

      addNode({
        id: deviceId,
        label: item.device.id,
        type: "device",
      });

      links.push({
        source: accountId,
        target: deviceId,
        label: "USES",
      });

      const connectedCustomerId =
        `customer-${item.customer.id}`;

      addNode({
        id: connectedCustomerId,
        label: item.customer.name,
        type: "customer",
        riskLevel: item.customer.riskLevel,
      });

      links.push({
        source: deviceId,
        target: connectedCustomerId,
        label: "SHARED WITH",
      });
    });

    return {
      nodes,
      links,
    };
  }, [
    accountId,
    customerName,
    connections,
    sharedDevices,
  ]);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      {/* Graph header */}

      <div className="border-b border-slate-800 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">
              Relationship graph
            </p>

            <p className="text-xs text-slate-500">
              Explore connected financial entities
            </p>
          </div>

          {/* Legend */}

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <LegendItem
              label="Account"
              className="bg-blue-500"
            />

            <LegendItem
              label="Customer"
              className="bg-purple-500"
            />

            <LegendItem
              label="Device"
              className="bg-amber-500"
            />

            <LegendItem
              label="High risk"
              className="bg-red-500"
            />
          </div>
        </div>
      </div>

      {/* Graph */}

      <div className="h-105 w-full">
        <ForceGraph2D
          graphData={graphData}
          nodeLabel={(node) => {
            const graphNode =
              node as unknown as GraphNode;

            return `${graphNode.type}: ${graphNode.label}`;
          }}
          linkLabel={(link) => {
            const graphLink =
              link as unknown as GraphLink;

            return graphLink.label;
          }}
          nodeRelSize={6}
          width={700}
          height={420}
          backgroundColor="#020617"
          linkColor={() => "#334155"}
          linkWidth={1.5}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          cooldownTicks={100}
          d3VelocityDecay={0.4}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const graphNode =
              node as unknown as GraphNode;

            const x = node.x ?? 0;
            const y = node.y ?? 0;

            let nodeColor = "#3b82f6";

            if (graphNode.type === "customer") {
              nodeColor = "#a855f7";
            }

            if (graphNode.type === "device") {
              nodeColor = "#f59e0b";
            }

            if (
              graphNode.riskLevel?.toUpperCase() ===
              "HIGH"
            ) {
              nodeColor = "#ef4444";
            }

            /*
             * Node
             */

            ctx.beginPath();
            ctx.arc(
              x,
              y,
              7,
              0,
              2 * Math.PI
            );

            ctx.fillStyle = nodeColor;
            ctx.fill();

            /*
             * Label
             */

            const fontSize =
              Math.max(10, 12 / globalScale);

            ctx.font = `${fontSize}px Inter, sans-serif`;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillStyle = "#e2e8f0";

            ctx.fillText(
              graphNode.label,
              x,
              y + 16
            );
          }}
        />
      </div>

      {/* Graph explanation */}

      <div className="border-t border-slate-800 px-4 py-3">
        <p className="text-xs leading-5 text-slate-500">
          Relationships are derived from transaction,
          customer and device connections in the graph
          database. Drag nodes to explore the network.
        </p>
      </div>
    </div>
  );
}

function LegendItem({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`h-2 w-2 rounded-full ${className}`}
      />

      <span>{label}</span>
    </div>
  );
}