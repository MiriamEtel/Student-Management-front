import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { environment } from '../../environments/environment'; // ייבוא משתנה הסביבה

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: any[] = [];
  winner: any = {};
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadResults();
  }

  loadResults() {
    const apiUrl = environment.apiUrl; // שימוש במשתנה apiUrl

    this.http.get(`${apiUrl}/get_vote_results`).subscribe((response: any) => {
      this.results = response;
      this.winner = this.results.reduce((prev, current) => (prev.vote_count > current.vote_count) ? prev : current);
      this.createChart();
    });
  }

  // פונקציה ליצירת צבע אקראי
  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createChart() {
    const labels = this.results.map(result => result.class_name);
    const voteCounts = this.results.map(result => result.vote_count);

    // יצירת צבעים אקראיים לכל כיתה
    const barColors = this.results.map(() => this.generateRandomColor());

    this.chart = new Chart('voteChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'מספר הצבעות',
          data: voteCounts,
          backgroundColor: barColors, // צבעים אקראיים עבור כל בר
          borderColor: barColors, // גבולות בצבעים המתאימים
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
