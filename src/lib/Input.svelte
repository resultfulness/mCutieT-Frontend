<script lang="ts">
  export let required: boolean = false;
  export let value: string | number = "";
  export let type: string = "text";
  export let label: string = "";
  export let name: string = "";
  export let placeholder: string = "";

  let passwordVisible: boolean = false;

  function togglePasswordVisibility() {
    passwordVisible = !passwordVisible;
  }

  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    value = event.currentTarget.value;
  }
</script>

<label>
  {label}
  <input
    type={passwordVisible ? "text" : type}
    {required}
    {value}
    {placeholder}
    {name}
    on:input={handleInput}
    style={label ? "margin-top: .25rem" : ""}
  />
  {#if type === "password"}
    <button type="button" class="eye" on:click={togglePasswordVisibility}>
      <span class="material-icons">
        {passwordVisible ? "visibility_off" : "visibility"}
      </span>
    </button>
  {/if}
</label>

<style>
  input {
    padding: 0.75rem;
    border: 0;
    border-bottom: 2px solid #666;
    background-color: var(--clr-input);
    width: 100%;
    font-size: 1.2rem;
  }

  label {
    position: relative;
    margin: 0;
    font-size: 0.85rem;
  }

  button.eye {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0.5rem;
    border: 0;
    padding: 0;
    background: transparent;
  }
</style>
