package main
import (
  "net/http"
)
func main() {
  http.Handle("/", http.FileServer(
    http.Dir("D:/go-projects/src/github.com/Tendernesszh.github.io/")))
  http.ListenAndServe(":8080", nil)
}
