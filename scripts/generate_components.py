#!/usr/bin/env python3
"""
Generate reusable AI Search Audit components
"""

import os
import sys

def create_component(name, component_type="functional"):
    """Create a new component file"""
    
    components_dir = "src/components"
    os.makedirs(components_dir, exist_ok=True)
    
    filename = f"{components_dir}/{name}.tsx"
    
    if component_type == "functional":
        template = f'''import React from 'react';
import {{ motion }} from 'framer-motion';

interface {name}Props {{
  // Add props here
}}

export const {name}: React.FC<{name}Props> = (props) => {{
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{name}</h2>
        {{/* Add content here */}}
      </div>
    </motion.div>
  );
}};
'''
    
    with open(filename, 'w') as f:
        f.write(template)
    
    print(f"✅ Created component: {filename}")

def create_page(name):
    """Create a new page file"""
    
    pages_dir = "src/pages"
    os.makedirs(pages_dir, exist_ok=True)
    
    filename = f"{pages_dir}/{name}.tsx"
    
    template = f'''import React from 'react';
import {{ motion }} from 'framer-motion';
import {{ Navbar }} from '../components/Navbar';
import {{ Footer }} from '../components/Footer';

export const {name}: React.FC = () => {{
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-6">{name}</h1>
          {{/* Add page content here */}}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}};
'''
    
    with open(filename, 'w') as f:
        f.write(template)
    
    print(f"✅ Created page: {filename}")

def main():
    if len(sys.argv) < 3:
        print("Usage: python generate_components.py <type> <name>")
        print("  type: 'component' or 'page'")
        print("  name: Component/Page name (PascalCase)")
        sys.exit(1)
    
    comp_type = sys.argv[1]
    name = sys.argv[2]
    
    if comp_type == "component":
        create_component(name)
    elif comp_type == "page":
        create_page(name)
    else:
        print(f"❌ Unknown type: {comp_type}")
        sys.exit(1)

if __name__ == "__main__":
    main()
