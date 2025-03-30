import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.interface';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  filters = {
    location: '',
    type: '',
    priceRange: '',
    bedrooms: ''
  };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getAllProperties().subscribe(
      properties => this.properties = properties
    );
  }

  onSearch() {
    this.propertyService.searchProperties(this.filters).subscribe(
      properties => this.properties = properties
    );
  }
} 