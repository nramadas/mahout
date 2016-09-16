module Main exposing (..)

import Html exposing (div, text, Html)
import Html.Attributes exposing (class)
import Html.App

type alias Model =
  String

init : ( Model, Cmd Msg )
init =
  ( "Hello", Cmd.none )

type Msg
  = NoOp

view : Model -> Html Msg
view model =
  div [ class "App" ]
    [ text model ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    NoOp ->
      ( model, Cmd.none )

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

main : Program Never
main =
  Html.App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
