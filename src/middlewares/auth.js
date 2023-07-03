/* export function isUser(req, res, next) {
  if (req.session?.user?.email) {
    return next();
  }
  return res.status(401).render('error', { error: 'error de autenticacion!' });
}

export function isAdmin(req, res, next) {
  if (req.session?.user?.isAdmin) {
    return next();
  }
  return res.status(403).render('error', { error: 'error de autorización!' });
} */

export function checkAuth(role) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'error de autenticacion!' });
    if (req.user.role != role) return res.status(403).json({ error: 'error de autorización!' });
    next();
  };
}

import passport from 'passport';

export function passportCall(strategy) {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
}
