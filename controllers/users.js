const User = require('../models/user');


module.exports.renderRegisterForm = (req, res) => {
    res.render('user/register');
};
module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp-Campground');
            res.redirect('/campgrounds');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('register');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('user/login');
};
module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};


module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye');
    res.redirect('/campgrounds');
};

