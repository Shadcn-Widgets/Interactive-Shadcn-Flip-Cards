# Interactive Flip Cards with Statistical Charts

A beautiful and interactive statistical card component for your Shadcn UI dashboard that features a smooth flip animation to reveal detailed charts.

[Click Here to see the demo](https://shadcn-widgets.xyz/widget/interactive-flip-cards-with-statistical-charts)

## Features

- 🎭 Smooth flip animation on hover
- 📊 Interactive bar charts on the back
- 🎨 Customizable gradient backgrounds
- 📈 Trend indicators with percentage changes
- 🔢 Animated number transitions
- 📱 Fully responsive design
- 🎯 Progress indicator
- ⚡ Built with React Spring for smooth animations

## Installation

### Using Shadcn CLI

```bash
npx shadcn add https://shadcn-widgets.xyz/registry/interactive-flip-cards-with-statistical-charts
```

### Manual Installation

1. Make sure you have shadcn/ui installed in your project. If not, follow the [official installation guide](https://ui.shadcn.com/docs/installation).

2. Install the required dependencies:

```bash
npm install @react-spring/web recharts lucide-react
# or
yarn add @react-spring/web recharts lucide-react
# or
pnpm add @react-spring/web recharts lucide-react
```

3. Copy the `stat-card.tsx` component into your project's components directory.

## Usage

```tsx
import StatCard from "./stat-card";
import { DollarSign } from "lucide-react";

const revenueData = [
  { date: "2024-01-01", value: 10 },
  { date: "2024-02-01", value: 20 },
  { date: "2024-03-01", value: 30 },
];

<StatCard
  title="Revenue"
  value={50}
  prefix="$"
  icon={<DollarSign />}
  change={-2.5}
  chartData={revenueData}
  chartColor="#8D6A9F"
  gradient="from-[#E53D00] to-[#FFE900] dark:from-[#CC3700] dark:to-[#E6D100]"
  progress={0.5}
/>;
```

## Props

| Prop         | Type               | Description                                  |
| ------------ | ------------------ | -------------------------------------------- |
| `title`      | `string`           | The title of the stat card                   |
| `value`      | `number`           | The main value to display                    |
| `prefix`     | `string`           | Optional prefix for the value (e.g., "$")    |
| `suffix`     | `string`           | Optional suffix for the value (e.g., "%")    |
| `icon`       | `ReactNode`        | Icon component to display                    |
| `change`     | `number`           | Percentage change (positive or negative)     |
| `chartData`  | `ChartDataPoint[]` | Array of data points for the chart           |
| `chartColor` | `string`           | Primary color for the chart                  |
| `gradient`   | `string`           | Tailwind gradient classes for the background |
| `progress`   | `number`           | Progress value between 0 and 1               |

## Features in Detail

### Front Card

- Displays main statistics with large, animated numbers
- Shows trend indicators (up/down) with percentage changes
- Progress bar for additional context
- Custom icon and title

### Back Card

- Interactive bar chart with hover tooltips
- Date formatting for x-axis
- Value formatting with prefixes/suffixes
- Dropdown menu for additional actions
- Grid lines for better readability

## License

MIT License - feel free to use this component in your projects!

## Credits

Built with:

- [shadcn/ui](https://ui.shadcn.com/)
- [React Spring](https://www.react-spring.dev/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
