import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  userRating: number | undefined;
  public myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.initializeRating();
    this.myForm=this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      id_usuario: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(10)]],
      fecha_nacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)]]
    })
  }

  public get f(): any {
    return this.myForm.controls;
  }

  initializeRating() {
    const ratingContainer = document.getElementById("user-rating");

    if (ratingContainer) {
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;";
        star.setAttribute("data-rating", i.toString());
        ratingContainer.appendChild(star);
      }

      ratingContainer.addEventListener("click", (e) => this.handleStarClick(e));
    }
  }

  handleStarClick(event: Event) {
    const target = event.target as HTMLElement; // Asertar que es HTMLElement
    if (target.classList.contains("star")) {
      const clickedRating = parseInt(target.getAttribute("data-rating") || '0', 10);
      console.log("Calificación seleccionada:", clickedRating);
      this.userRating = clickedRating;
      this.paintStars(clickedRating);
    }
  }

  paintStars(rating: number) {
    const stars = document.querySelectorAll(".star");

    if (stars) {
      stars.forEach((star) => {
        const starRating = parseInt((star as HTMLElement).getAttribute("data-rating") || '0', 10);
        (star as HTMLElement).style.color = starRating <= rating ? "#f0ad4e" : "#888";
      });
    }
  }



}
