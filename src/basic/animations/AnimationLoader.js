/**
 * Load and Add Separated Animations to Model
 */
class AnimationLoader {
    constructor(urlModel, urlAnimations) {
        this.model = null
        this.urlModel = urlModel //string
        this.urlAnimations = urlAnimations //object (json)
    }
    addPromiseLoader(promiseLoader) {
        this.promiseLoader = promiseLoader // class
    }
    getModelWithAnimations() {
        return  new Promise((res, rej)=>{
            const animationAndModelPromises = []
            //first loading (model)
            animationAndModelPromises.push(this.promiseLoader.load(this.urlModel))
    
            //other loading (animations)
            Object.keys(this.urlAnimations).forEach(stringIndex => {
                animationAndModelPromises.push(this.promiseLoader.load(this.urlAnimations[stringIndex]))
            });
    
            Promise.all(animationAndModelPromises).then(payload => {
                const model = payload.shift() //elemento
                const animationEmptyModels = payload //array
                
                const animations = []
    
                //keeping the indexes of the this.urlAnimations object
                Object.keys(this.urlAnimations).forEach(stringIndex => {
                    animations[stringIndex*1] = animationEmptyModels.shift().animations[0]
                })
                model.animations = animations
                res(model)
            })
        })
    }
}

export default AnimationLoader