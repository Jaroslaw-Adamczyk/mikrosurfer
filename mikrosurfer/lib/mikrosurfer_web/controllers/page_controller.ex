defmodule MikrosurferWeb.PageController do
  use MikrosurferWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
