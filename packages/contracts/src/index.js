// RecoveryOS Design System Contracts
// This is the canonical source of truth for all contracts, events, and data models
export var Lens;
(function (Lens) {
    Lens["INDIVIDUAL"] = "individual";
    Lens["PROFESSIONAL"] = "professional";
    Lens["ORGANISATION"] = "organisation";
})(Lens || (Lens = {}));
export var Intent;
(function (Intent) {
    Intent["NAVIGATE"] = "navigate";
    Intent["CREATE"] = "create";
    Intent["EDIT"] = "edit";
    Intent["DELETE"] = "delete";
    Intent["SHARE"] = "share";
    Intent["EXPORT"] = "export";
})(Intent || (Intent = {}));
export var StateBand;
(function (StateBand) {
    StateBand["CLEAR"] = "clear";
    StateBand["LOADED"] = "loaded";
    StateBand["NARROW_WINDOW"] = "narrow_window";
    StateBand["ANY_STATE"] = "any_state";
})(StateBand || (StateBand = {}));
