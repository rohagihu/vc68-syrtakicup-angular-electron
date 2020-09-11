interface IRankingTeam {
  teamID: number;
  teamName: string;
  bigPointsWon: number;
  bigPointsLost: number;
  smallPointsWon: number;
  smallPointsLost: number;
};

interface IRankingGroup {
  group: string;
  teams: IRankingTeam[];
}

interface IPlacementGroupScheduleItem {
  preliminaryRankingGroup: number;
  bigPointsA: number;
  bigPointsB: number;
  game: {
    pointsA: number;
    pointsB: number;
  }[];
  teamA: number;
  teamB: number;
  referee: number;
  fieldName: string;
  fieldPos: number;
};

export {IRankingTeam, IRankingGroup, IPlacementGroupScheduleItem}
