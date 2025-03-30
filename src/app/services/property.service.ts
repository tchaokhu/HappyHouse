import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../models/property.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private properties: Property[] = [
    {
      id: 1,
      title: 'Luxury Villa with Ocean View',
      price: 750000,
      description: 'Beautiful 4-bedroom villa with modern amenities and a swimming pool.',
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
      type: 'villa',
      location: 'Miami Beach, FL',
      imageUrl: 'https://origin.co.th/wp-content/uploads/2019/04/1449561304-3.jpg',
      amenities: ['Swimming Pool', 'Garden', 'Security System', 'Ocean View']
    },
    {
      id: 2,
      title: 'Modern Downtown Apartment',
      price: 320000,
      description: 'Spacious 2-bedroom apartment in the heart of the city.',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'apartment',
      location: 'Downtown Area',
      imageUrl: 'https://origin.co.th/wp-content/uploads/2019/05/Gallery-Rama4-Dec24_3.jpg',
      amenities: ['Gym', 'Parking', 'Security']
    },
    {
      id: 3,
      title: 'Family Home with Garden',
      price: 450000,
      description: 'Cozy 3-bedroom house with a large backyard and garage.',
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      type: 'house',
      location: 'Suburban Area',
      imageUrl: 'https://sg1-cdn.pgimgs.com/projectnet-project/198483/ZPPHO.145864693.R800X800.jpg',
      amenities: ['Garden', 'Garage', 'Patio']
    }
  ];

  constructor() { }

  getAllProperties(): Observable<Property[]> {
    return of(this.properties);
  }

  getPropertyById(id: number): Observable<Property | undefined> {
    return of(this.properties.find(property => property.id === id));
  }

  searchProperties(filters: {
    location?: string;
    type?: string;
    priceRange?: string;
    bedrooms?: string;
  }): Observable<Property[]> {
    let filteredProperties = [...this.properties];

    if (filters.location) {
      filteredProperties = filteredProperties.filter(p => 
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.type) {
      filteredProperties = filteredProperties.filter(p => p.type === filters.type);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filteredProperties = filteredProperties.filter(p => 
        p.price >= min && (!max || p.price <= max)
      );
    }

    if (filters.bedrooms) {
      const beds = parseInt(filters.bedrooms);
      filteredProperties = filteredProperties.filter(p => 
        filters.bedrooms === '3+' ? p.bedrooms >= 3 : p.bedrooms === beds
      );
    }

    return of(filteredProperties);
  }
} 