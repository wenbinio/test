import type { GameState } from "@star-realms/shared/types";
import { BossPanel } from "./BossPanel";
import { TradeRow } from "./TradeRow";
import { PartnerArea, SelfArea } from "./PlayerArea";
import { Hand } from "./Hand";
import { ChatPanel, EventLog } from "./EventLog";

interface Props {
  state: GameState;
  myId: string | null;
}

export function GameBoard({ state, myId }: Props) {
  const me = state.players.find((p) => p.id === myId);
  const partner = state.players.find((p) => p.id !== myId);

  if (!me) return <div className="lobby"><div className="lobby-card">Player not in game.</div></div>;

  return (
    <>
      <div className="board">
        <BossPanel state={state} myId={myId} />
        <TradeRow state={state} myId={myId} />
        <div className="board-center">
          <div className="center-main">
            {partner && <PartnerArea state={state} partner={partner} />}
            <SelfArea state={state} me={me} />
          </div>
          <div className="center-side">
            <EventLog state={state} />
            <ChatPanel />
          </div>
        </div>
      </div>
      <Hand state={state} me={me} />
    </>
  );
}
