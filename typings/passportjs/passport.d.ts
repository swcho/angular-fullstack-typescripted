
/// <reference path="../express/express.d.ts" />

declare module "passport" {
    import express = require('express');

    module p {
        export interface Request extends express.Request {
            isAuthenticated(): boolean;
        }

        export interface Strategy {
            authenticate(req, options);
        }

        /**
         * Utilize the given `strategy` with optional `name`, overridding the strategy's
         * default name.
         *
         * Examples:
         *
         *     passport.use(new TwitterStrategy(...));
         *
         *     passport.use('api', new http.BasicStrategy(...));
         *
         * @param {String|Strategy} name
         * @param {Strategy} strategy
         * @return {Authenticator} for chaining
         * @api public
         */
        export function use(strategy: Strategy);
        export function use(strategyName: string, strategy: Strategy);

        /**
         * Un-utilize the `strategy` with given `name`.
         *
         * In typical applications, the necessary authentication strategies are static,
         * configured once and always available.  As such, there is often no need to
         * invoke this function.
         *
         * However, in certain situations, applications may need dynamically configure
         * and de-configure authentication strategies.  The `use()`/`unuse()`
         * combination satisfies these scenarios.
         *
         * Examples:
         *
         *     passport.unuse('legacy-api');
         *
         * @param {String} name
         * @return {Authenticator} for chaining
         * @api public
         */
        export function unuse(name: string);

        /**
         * Setup Passport to be used under framework.
         *
         * By default, Passport exposes middleware that operate using Connect-style
         * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
         * have different expectations, and this function allows Passport to be adapted
         * to operate within such environments.
         *
         * If you are using a Connect-compatible framework, including Express, there is
         * no need to invoke this function.
         *
         * Examples:
         *
         *     passport.framework(require('hapi-passport')());
         *
         * @param {Object} name
         * @return {Authenticator} for chaining
         * @api public
         */
        export function framework(fw);


        export interface AuthenticateOptions {
            session: boolean; // Save login state in session, defaults to _true_
            successRedirect: string; // After successful login, redirect to given URL
            failureRedirect: string; // After failed login, redirect to given URL
            assignProperty: string; // Assign the object provided by the verify callback to given property
        }

        export interface FAuthenticateCb {
            (err, user, info): void;
        }
        /**
         * Middleware that will authenticate a request using the given `strategy` name,
         * with optional `options` and `callback`.
         *
         * Examples:
         *
         *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);
         *
         *     passport.authenticate('local', function(err, user) {
         *       if (!user) { return res.redirect('/login'); }
         *       res.end('Authenticated!');
         *     })(req, res);
         *
         *     passport.authenticate('basic', { session: false })(req, res);
         *
         *     app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
         *       // request will be redirected to Twitter
         *     });
         *     app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
         *       res.json(req.user);
         *     });
         *
         * @param {String} strategy
         * @param {Object} options
         * @param {Function} callback
         * @return {Function} middleware
         * @api public
         */
        export function authenticate(strategyName: string, options: AuthenticateOptions, callback: FAuthenticateCb);
        export function authenticate(strategyName: string, callback: FAuthenticateCb);

        /**
         * Middleware that will authorize a third-party account using the given
         * `strategy` name, with optional `options`.
         *
         * If authorization is successful, the result provided by the strategy's verify
         * callback will be assigned to `req.account`.  The existing login session and
         * `req.user` will be unaffected.
         *
         * This function is particularly useful when connecting third-party accounts
         * to the local account of a user that is currently authenticated.
         *
         * Examples:
         *
         *    passport.authorize('twitter-authz', { failureRedirect: '/account' });
         *
         * @param {String} strategy
         * @param {Object} options
         * @return {Function} middleware
         * @api public
         */
        export function authorize(strategy, options, callback);

        /**
         * Middleware that will restore login state from a session.
         *
         * Web applications typically use sessions to maintain login state between
         * requests.  For example, a user will authenticate by entering credentials into
         * a form which is submitted to the server.  If the credentials are valid, a
         * login session is established by setting a cookie containing a session
         * identifier in the user's web browser.  The web browser will send this cookie
         * in subsequent requests to the server, allowing a session to be maintained.
         *
         * If sessions are being utilized, and a login session has been established,
         * this middleware will populate `req.user` with the current user.
         *
         * Note that sessions are not strictly required for Passport to operate.
         * However, as a general rule, most web applications will make use of sessions.
         * An exception to this rule would be an API server, which expects each HTTP
         * request to provide credentials in an Authorization header.
         *
         * Examples:
         *
         *     app.configure(function() {
         *       app.use(connect.cookieParser());
         *       app.use(connect.session({ secret: 'keyboard cat' }));
         *       app.use(passport.initialize());
         *       app.use(passport.session());
         *     });
         *
         * Options:
         *   - `pauseStream`      Pause the request stream before deserializing the user
         *                        object from the session.  Defaults to _false_.  Should
         *                        be set to true in cases where middleware consuming the
         *                        request body is configured after passport and the
         *                        deserializeUser method is asynchronous.
         *
         * @param {Object} options
         * @return {Function} middleware
         * @api public
         */
        export function session(options);


        export interface FSerializeUser {
            (user, done: (err, id)=> void): void;
        }

        /**
         * Registers a function used to serialize user objects into the session.
         *
         * Examples:
         *
         *     passport.serializeUser(function(user, done) {
         *       done(null, user.id);
         *     });
         *
         * @api public
         */
        export function serializeUser(fn: FSerializeUser, req?, done?);

        export interface FDeserializeUser {
            (id, done: (err, user) => void): void;
        }
        /**
         * Registers a function used to deserialize user objects out of the session.
         *
         * Examples:
         *
         *     passport.deserializeUser(function(id, done) {
         *       User.findById(id, function (err, user) {
         *         done(err, user);
         *       });
         *     });
         *
         * @api public
         */
        export function deserializeUser(fn: FDeserializeUser, req?, done?);

        /**
         * Registers a function used to transform auth info.
         *
         * In some circumstances authorization details are contained in authentication
         * credentials or loaded as part of verification.
         *
         * For example, when using bearer tokens for API authentication, the tokens may
         * encode (either directly or indirectly in a database), details such as scope
         * of access or the client to which the token was issued.
         *
         * Such authorization details should be enforced separately from authentication.
         * Because Passport deals only with the latter, this is the responsiblity of
         * middleware or routes further along the chain.  However, it is not optimal to
         * decode the same data or execute the same database query later.  To avoid
         * this, Passport accepts optional `info` along with the authenticated `user`
         * in a strategy's `success()` action.  This info is set at `req.authInfo`,
         * where said later middlware or routes can access it.
         *
         * Optionally, applications can register transforms to proccess this info,
         * which take effect prior to `req.authInfo` being set.  This is useful, for
         * example, when the info contains a client ID.  The transform can load the
         * client from the database and include the instance in the transformed info,
         * allowing the full set of client properties to be convieniently accessed.
         *
         * If no transforms are registered, `info` supplied by the strategy will be left
         * unmodified.
         *
         * Examples:
         *
         *     passport.transformAuthInfo(function(info, done) {
         *       Client.findById(info.clientID, function (err, client) {
         *         info.client = client;
         *         done(err, info);
         *       });
         *     });
         *
         * @api public
         */
        export function transformAuthInfo(fn, req, done);
    }

    export = p;
}
