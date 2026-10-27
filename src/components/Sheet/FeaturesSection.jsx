import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, Award } from 'lucide-react';

export default function FeaturesSection({ character, onOpenAddFeature, onRemoveFeature }) {
  const [expandedIds, setExpandedIds] = useState({});
  const [sourceFilter, setSourceFilter] = useState('all');
  const [search, setSearch] = useState('');

  const features = character.features || [];

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFeatures = features.filter(f => {
    if (sourceFilter !== 'all' && !f.source?.toLowerCase().includes(sourceFilter.toLowerCase())) return false;
    if (search.trim() && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.description?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="section-box" style={{ marginBottom: '0.75rem' }}>
      <div className="section-box-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Award size={15} style={{ color: 'var(--accent-gold)' }} />
          Features &amp; Traits
        </span>
        <button
          type="button"
          className="btn btn-secondary btn-sm no-print"
          style={{ padding: '0.15rem 0.5rem', fontSize: '0.72rem' }}
          onClick={onOpenAddFeature}
        >
          <Plus size={13} />
          <span>Add Feature</span>
        </button>
      </div>

      {/* Filter and Search Bar (no-print) */}
      <div className="no-print" style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem' }}>
        <input
          type="text"
          className="form-input"
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#fff', color: '#111' }}
          placeholder="Filter features..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{ width: '110px', padding: '0.25rem', fontSize: '0.75rem', background: '#fff', color: '#111' }}
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        >
          <option value="all">All Sources</option>
          <option value="class">Class</option>
          <option value="racial">Racial</option>
          <option value="feat">Feats</option>
          <option value="background">Background</option>
        </select>
      </div>

      {/* Features List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '450px', overflowY: 'auto' }}>
        {filteredFeatures.map(feat => {
          const isExpanded = expandedIds[feat.id] ?? true;

          return (
            <div
              key={feat.id}
              style={{
                border: '1px solid var(--parchment-border-light)',
                borderRadius: '5px',
                padding: '0.45rem 0.6rem',
                background: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', flex: 1 }}
                  onClick={() => toggleExpand(feat.id)}
                >
                  <span className="no-print" style={{ color: 'var(--parchment-text-muted)' }}>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--parchment-text)' }}>
                    {feat.name}
                  </span>
                  {feat.source && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--parchment-text-muted)', marginLeft: '0.3rem' }}>
                      [{feat.source}]
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="no-print"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-red)', padding: '0.1rem' }}
                  title="Remove feature"
                  onClick={() => onRemoveFeature && onRemoveFeature(feat.id)}
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {isExpanded && feat.description && (
                <div style={{ fontSize: '0.8rem', color: 'var(--parchment-text)', marginTop: '0.3rem', lineHeight: '1.4' }}>
                  {feat.description}
                </div>
              )}
            </div>
          );
        })}

        {filteredFeatures.length === 0 && (
          <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--parchment-text-muted)', fontSize: '0.8rem' }}>
            No features found.
          </div>
        )}
      </div>
    </div>
  );
}
