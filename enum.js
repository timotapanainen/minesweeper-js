const GameState = {
    Created: Symbol('Created'),
    Running: Symbol('Running'),
    Cleared: Symbol('Cleared'),
    Failed: Symbol('Failed'),

    toString: function(state) {
        switch (state) {
            case GameState.Created:
                return "Created";
            case GameState.Running:
                return "Running";
            case GameState.Failed:
                return "Failed";
            case GameState.Cleared:
                return "Cleared";
        }
    }
}

module.exports = GameState;