import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../../services/admin-service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-admin-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, NgIf, NgFor,MatToolbarModule, MatProgressSpinnerModule],
  templateUrl: './admin-summary.html',
  styleUrls: ['./admin-summary.css']
})
export class AdminSummary implements OnInit {
  summary: any; 
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAdminSummary().subscribe({
      next: (res) => {
        this.summary = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading summary', err);
        this.loading = false;
      }
    });
  }
}
