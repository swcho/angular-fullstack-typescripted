
declare module "passport" {
    import express = require('express');
    interface Request extends express.Request {
        isAuthenticated(): boolean;
    }
}
