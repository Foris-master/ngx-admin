import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { VisitorsAnalyticsData } from '../data/visitors-analytics';
import * as i0 from "@angular/core";
import * as i1 from "./periods.service";
export class VisitorsAnalyticsService extends VisitorsAnalyticsData {
    constructor(periodService) {
        super();
        this.periodService = periodService;
        this.pieChartValue = 75;
        this.innerLinePoints = [
            94, 188, 225, 244, 253, 254, 249, 235, 208,
            173, 141, 118, 105, 97, 94, 96, 104, 121, 147,
            183, 224, 265, 302, 333, 358, 375, 388, 395,
            400, 400, 397, 390, 377, 360, 338, 310, 278,
            241, 204, 166, 130, 98, 71, 49, 32, 20, 13, 9,
        ];
        this.outerLinePoints = [
            85, 71, 59, 50, 45, 42, 41, 44, 58, 88,
            136, 199, 267, 326, 367, 391, 400, 397,
            376, 319, 200, 104, 60, 41, 36, 37, 44,
            55, 74, 100, 131, 159, 180, 193, 199, 200,
            195, 184, 164, 135, 103, 73, 50, 33, 22, 15, 11,
        ];
    }
    generateOutlineLineData() {
        const months = this.periodService.getMonths();
        const outerLinePointsLength = this.outerLinePoints.length;
        const monthsLength = months.length;
        return this.outerLinePoints.map((p, index) => {
            const monthIndex = Math.round(index / 4);
            const label = (index % Math.round(outerLinePointsLength / monthsLength) === 0)
                ? months[monthIndex]
                : '';
            return {
                label,
                value: p,
            };
        });
    }
    getInnerLineChartData() {
        return observableOf(this.innerLinePoints);
    }
    getOutlineLineChartData() {
        return observableOf(this.generateOutlineLineData());
    }
    getPieChartData() {
        return observableOf(this.pieChartValue);
    }
}
VisitorsAnalyticsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: VisitorsAnalyticsService, deps: [{ token: i1.PeriodsService }], target: i0.ɵɵFactoryTarget.Injectable });
VisitorsAnalyticsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: VisitorsAnalyticsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: VisitorsAnalyticsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.PeriodsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvcnMtYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9yZXN0LWFkbWluL3NyYy9saWIvQGNvcmUvbW9jay92aXNpdG9ycy1hbmFseXRpY3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxFQUFFLElBQUksWUFBWSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRXRELE9BQU8sRUFBZSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFHaEYsTUFBTSxPQUFPLHdCQUF5QixTQUFRLHFCQUFxQjtJQUVqRSxZQUFvQixhQUE2QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQURVLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUl6QyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixvQkFBZSxHQUFhO1lBQ2xDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUMxQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQzdDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUMzQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7WUFDM0MsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDOUMsQ0FBQztRQUNNLG9CQUFlLEdBQWE7WUFDbEMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRyxFQUFFLEVBQUUsRUFBRTtZQUN2QyxHQUFHLEVBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUN2QyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdEMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQzFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1NBQ2hELENBQUM7SUFoQkYsQ0FBQztJQWlCTyx1QkFBdUI7UUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QyxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBQzFELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFbkMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFUCxPQUFPO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUJBQXFCO1FBQ25CLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7cUhBakRVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvZiBhcyBvYnNlcnZhYmxlT2YsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBlcmlvZHNTZXJ2aWNlIH0gZnJvbSAnLi9wZXJpb2RzLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3V0bGluZURhdGEsIFZpc2l0b3JzQW5hbHl0aWNzRGF0YSB9IGZyb20gJy4uL2RhdGEvdmlzaXRvcnMtYW5hbHl0aWNzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZpc2l0b3JzQW5hbHl0aWNzU2VydmljZSBleHRlbmRzIFZpc2l0b3JzQW5hbHl0aWNzRGF0YSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwZXJpb2RTZXJ2aWNlOiBQZXJpb2RzU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHBpZUNoYXJ0VmFsdWUgPSA3NTtcbiAgcHJpdmF0ZSBpbm5lckxpbmVQb2ludHM6IG51bWJlcltdID0gW1xuICAgIDk0LCAxODgsIDIyNSwgMjQ0LCAyNTMsIDI1NCwgMjQ5LCAyMzUsIDIwOCxcbiAgICAxNzMsIDE0MSwgMTE4LCAxMDUsIDk3LCA5NCwgOTYsIDEwNCwgMTIxLCAxNDcsXG4gICAgMTgzLCAyMjQsIDI2NSwgMzAyLCAzMzMsIDM1OCwgMzc1LCAzODgsIDM5NSxcbiAgICA0MDAsIDQwMCwgMzk3LCAzOTAsIDM3NywgMzYwLCAzMzgsIDMxMCwgMjc4LFxuICAgIDI0MSwgMjA0LCAxNjYsIDEzMCwgOTgsIDcxLCA0OSwgMzIsIDIwLCAxMywgOSxcbiAgXTtcbiAgcHJpdmF0ZSBvdXRlckxpbmVQb2ludHM6IG51bWJlcltdID0gW1xuICAgIDg1LCA3MSwgNTksIDUwLCA0NSwgNDIsIDQxLCA0NCAsIDU4LCA4OCxcbiAgICAxMzYgLCAxOTksIDI2NywgMzI2LCAzNjcsIDM5MSwgNDAwLCAzOTcsXG4gICAgMzc2LCAzMTksIDIwMCwgMTA0LCA2MCwgNDEsIDM2LCAzNywgNDQsXG4gICAgNTUsIDc0LCAxMDAgLCAxMzEsIDE1OSwgMTgwLCAxOTMsIDE5OSwgMjAwLFxuICAgIDE5NSwgMTg0LCAxNjQsIDEzNSwgMTAzLCA3MywgNTAsIDMzLCAyMiwgMTUsIDExLFxuICBdO1xuICBwcml2YXRlIGdlbmVyYXRlT3V0bGluZUxpbmVEYXRhKCk6IE91dGxpbmVEYXRhW10ge1xuICAgIGNvbnN0IG1vbnRocyA9IHRoaXMucGVyaW9kU2VydmljZS5nZXRNb250aHMoKTtcbiAgICBjb25zdCBvdXRlckxpbmVQb2ludHNMZW5ndGggPSB0aGlzLm91dGVyTGluZVBvaW50cy5sZW5ndGg7XG4gICAgY29uc3QgbW9udGhzTGVuZ3RoID0gbW9udGhzLmxlbmd0aDtcblxuICAgIHJldHVybiB0aGlzLm91dGVyTGluZVBvaW50cy5tYXAoKHAsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBtb250aEluZGV4ID0gTWF0aC5yb3VuZChpbmRleCAvIDQpO1xuICAgICAgY29uc3QgbGFiZWwgPSAoaW5kZXggJSBNYXRoLnJvdW5kKG91dGVyTGluZVBvaW50c0xlbmd0aCAvIG1vbnRoc0xlbmd0aCkgPT09IDApXG4gICAgICAgID8gbW9udGhzW21vbnRoSW5kZXhdXG4gICAgICAgIDogJyc7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsLFxuICAgICAgICB2YWx1ZTogcCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRJbm5lckxpbmVDaGFydERhdGEoKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5pbm5lckxpbmVQb2ludHMpO1xuICB9XG5cbiAgZ2V0T3V0bGluZUxpbmVDaGFydERhdGEoKTogT2JzZXJ2YWJsZTxPdXRsaW5lRGF0YVtdPiB7XG4gICAgcmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmdlbmVyYXRlT3V0bGluZUxpbmVEYXRhKCkpO1xuICB9XG5cbiAgZ2V0UGllQ2hhcnREYXRhKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIG9ic2VydmFibGVPZih0aGlzLnBpZUNoYXJ0VmFsdWUpO1xuICB9XG59XG4iXX0=