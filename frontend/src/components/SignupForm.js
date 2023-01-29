function SignupForm({title}) {
    return(
        <div class="form-control w-full max-w-xs">
        <label class="label">
        <span class="label-text">What is your name?</span>
        <span class="label-text-alt">Alt label</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        <label class="label">
        <span class="label-text-alt">Alt label</span>
        <span class="label-text-alt">Alt label</span>
        </label>
        </div>
    )

}
export default SignupForm