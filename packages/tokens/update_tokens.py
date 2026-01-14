import json

with open('tokens.json', 'r') as f:
    data = json.load(f)

# Add new primitive colors
data['primitive-colors'].update({
    'purple-50': '#F8F7FF',
    'purple-100': '#F0EEFF',
    'purple-200': '#E1DDFF',
    'purple-300': '#C9C1FF',
    'purple-400': '#A89BFF',
    'purple-500': '#8573FF',
    'purple-600': '#6B52FF',
    'purple-700': '#5739FB',
    'purple-800': '#4A2ED8',
    'purple-900': '#3E2BB8',
    'purple-950': '#2A1F7A',
    'cyan-50': '#F0FFFF',
    'cyan-100': '#E0FFFF',
    'cyan-200': '#C0FFFF',
    'cyan-300': '#80FFFF',
    'cyan-400': '#40FFFF',
    'cyan-500': '#00FFFF',
    'cyan-600': '#00E6F2',
    'cyan-700': '#00CCE0',
    'cyan-800': '#00B3CC',
    'cyan-900': '#0099B8',
    'cyan-950': '#006680',
    'recovery-green-50': '#F0FFF8',
    'recovery-green-100': '#E0FFF0',
    'recovery-green-200': '#C0FFE8',
    'recovery-green-300': '#80FFD0',
    'recovery-green-400': '#40FFB8',
    'recovery-green-500': '#00FFA0',
    'recovery-green-600': '#00E68C',
    'recovery-green-700': '#00CC78',
    'recovery-green-800': '#00B364',
    'recovery-green-900': '#009950',
    'recovery-green-950': '#006630'
})

# Update semantic-colors
data['semantic-colors'] = {
    'surface-base': '{primitive-colors.gray-900}',
    'surface-elevated': '{primitive-colors.gray-800}',
    'ink-primary': '{primitive-colors.white}',
    'ink-secondary': '{primitive-colors.gray-300}',
    'ink-tertiary': '{primitive-colors.gray-400}',
    'ink-inverse': '{primitive-colors.gray-900}',
    'brand-primary': '{primitive-colors.purple-900}',
    'brand-primary-bright': '{primitive-colors.purple-600}',
    'brand-precision': '{primitive-colors.cyan-500}',
    'brand-growth': '{primitive-colors.recovery-green-500}',
    'accent-primary': '{semantic-colors.brand-primary}',
    'accent-warm': '{primitive-colors.orange-400}',
    'border-subtle': '{primitive-colors.gray-700}',
    'border-default': '{primitive-colors.gray-600}',
    'state-safe': '{primitive-colors.green-400}',
    'state-caution': '{primitive-colors.yellow-400}',
    'state-alert': '{primitive-colors.red-400}'
}

# Add axis-world
data['axis-world'] = {
    'companion': '{semantic-colors.brand-primary}',
    'console': '{semantic-colors.brand-precision}',
    'command': '{semantic-colors.brand-growth}'
}

# Add axis-framework
data['axis-framework'] = {
    'baseline': '{semantic-colors.brand-primary}',
    'pillars': '{semantic-colors.brand-precision}',
    'concepts': '{semantic-colors.brand-growth}'
}

# Add axis-state
data['axis-state'] = {
    'energy': '{semantic-colors.brand-primary}',
    'clarity': '{semantic-colors.brand-precision}',
    'anchorage': '{semantic-colors.brand-growth}'
}

# Add axis-contenttype
data['axis-contenttype'] = {
    'navicue': '{semantic-colors.brand-primary}',
    'journey': '{semantic-colors.brand-precision}',
    'article': '{semantic-colors.ink-secondary}',
    'insight': '{semantic-colors.brand-growth}',
    'practice': '{semantic-colors.brand-precision}',
    'audio': '{semantic-colors.brand-growth}',
    'story': '{semantic-colors.brand-primary}',
    'series': '{semantic-colors.brand-precision}'
}

# Add brush-variations
data['brush-variations'] = {
    'duotone-shadow': '{semantic-colors.brand-primary}',
    'duotone-highlight': '{semantic-colors.brand-precision}',
    'aurora-start': '{semantic-colors.brand-primary}',
    'aurora-end': '{primitive-colors.gray-950}',
    'micro-glow': 'rgba(87, 57, 251, 0.2)',
    'iridescent': 'linear-gradient(90deg, {semantic-colors.brand-primary-bright}, {semantic-colors.brand-precision}, {semantic-colors.brand-primary-bright})'
}

with open('tokens.json', 'w') as f:
    json.dump(data, f, indent=2)
