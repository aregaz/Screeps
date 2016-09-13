module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        screeps: {
            options: {
                email: 'illia.ratkevych@gmail.com',
                password: 'mypassword',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
};
