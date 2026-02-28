{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.gh pkgs.nodejs_20 ];
  env = { NEXT_TELEMETRY_DISABLED = "1"; };
  idx.extensions = [
    "bradlc.vscode-tailwindcss"
    "esbenp.prettier-vscode"
    "dbaeumer.vscode-eslint"
  ];
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
        manager = "web";
      };
    };
  };
}
