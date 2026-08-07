actor {
  var visitorCount : Nat = 0;

  public func trackVisit() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query func getVisitorCount() : async Nat {
    visitorCount;
  };
}
